import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useHaptic } from '../hooks/useHaptic';
import * as StoreReview from 'expo-store-review';
import { styles } from './FeedbackDialog.style';

interface FeedbackDialogProps {
  visible: boolean;
  onClose: () => void;
}

type FeedbackStep = 'initial' | 'positive' | 'negative' | 'submitted';

export const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ visible, onClose }) => {
  const [step, setStep] = useState<FeedbackStep>('initial');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const haptic = useHaptic();

  const handlePositive = async () => {
    haptic.impactAsync(haptic.ImpactFeedbackStyle.Medium);
    setStep('positive');

    // Check if store review is available
    const isAvailable = await StoreReview.isAvailableAsync();
    if (isAvailable) {
      await StoreReview.requestReview();
    }

    // Close after a delay
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const handleNegative = () => {
    haptic.impactAsync(haptic.ImpactFeedbackStyle.Medium);
    setStep('negative');
  };

  const handleSubmitFeedback = async () => {
    haptic.impactAsync(haptic.ImpactFeedbackStyle.Light);

    try {
      setIsSending(true);
      const response = await fetch('https://jola138-20138.wykr.es/webhook/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '',
          email: email,
          subject: 'App Feedback',
          message: feedback,
        }),
      });

      const data = await response.json();

      setStep('submitted');

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Still show success to user to avoid bad UX
      setStep('submitted');

      setTimeout(() => {
        handleClose();
      }, 2000);
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    setStep('initial');
    setFeedback('');
    setEmail('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.dialog}>
          {step === 'initial' && (
            <>
              <Text style={styles.title}>How do you like it?</Text>
              <Text style={styles.subtitle}>
                We'd love to hear about your experience
              </Text>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.negativeButton]}
                  onPress={handleNegative}
                >
                  <Text style={styles.emoji}>😕</Text>
                  <Text style={styles.buttonText}>Bad</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.button, styles.positiveButton]}
                  onPress={handlePositive}
                >
                  <Text style={styles.emoji}>😊</Text>
                  <Text style={styles.buttonText}>Good!</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Text style={styles.closeButtonText}>Maybe later</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 'positive' && (
            <>
              <Text style={styles.emoji}>🙏</Text>
              <Text style={styles.title}>Thank you!</Text>
              <Text style={styles.subtitle}>
                We're so glad you're enjoying our app
              </Text>
            </>
          )}

          {step === 'negative' && (
            <>
              <Text style={styles.title}>Help us improve</Text>
              <Text style={styles.subtitle}>
                What could we do better?
              </Text>

              <TextInput
                style={styles.textfield}
                placeholder="Email (optional)"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={styles.textarea}
                placeholder="Share your thoughts..."
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                multiline
                numberOfLines={4}
                value={feedback}
                onChangeText={setFeedback}
                autoFocus
              />

              <View style={styles.feedbackButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleClose}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.submitButton, !feedback && styles.submitButtonDisabled]}
                  onPress={handleSubmitFeedback}
                  disabled={!feedback}
                >
                  <Text style={styles.submitButtonText}>{isSending ? 'Sending...' : 'Submit'}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {step === 'submitted' && (
            <>
              <Text style={styles.emoji}>✅</Text>
              <Text style={styles.title}>Feedback received</Text>
              <Text style={styles.subtitle}>
                Thank you for helping us improve!
              </Text>
            </>
          )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
