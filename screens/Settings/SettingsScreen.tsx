import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { styles } from './SetttingsScreen.style';
import { MenuSectionOption, MenuSections } from '../../components/ui/MenuSection';
import { Settings, useSettings } from '../../context/SettingsContext';
import { usePaywall } from '../../context/PaywallContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles as globalStyles } from '../../styles/App.styles';
import { FeedbackDialog } from '../../components/FeedbackDialog';

import IconAnimation from '../../assets/icons/icon-animation.svg';
import IconAlbum from '../../assets/icons/icon-album.svg';
import IconCrown from '../../assets/icons/icon-crown.svg';
import IconDatabase from '../../assets/icons/icon-database.svg';
import IconEarthPin from '../../assets/icons/icon-earth-pin.svg';
import IconMailPen from '../../assets/icons/icon-mail-pen.svg';
import IconProfile from '../../assets/icons/icon-profile.svg';
import IconVibration from '../../assets/icons/icon-vibration.svg';

import Button from '../../components/ui/Button';
import TermsAndPrivacy from '../../components/TermsAndPrivacy';
import { ScrollView } from 'react-native-gesture-handler';

export const SettingsScreen: React.FC = () => {
  const isDev = process.env.EXPO_PUBLIC_ENV === 'dev';
  const navigation = useNavigation();
  const { settings, updateSetting, loading } = useSettings();
  const { isPro, showPaywall } = usePaywall();
  const [feedbackVisible, setFeedbackVisible] = useState(false);

  const updateSettings = async (key: keyof Settings, value: boolean) => {
    await updateSetting(key, value);
  };

  const handleCleanUp = () => {
    AsyncStorage.clear();
    Alert.alert('Data cleared. Please restart the app to apply changes')
  };

  if (loading) return null;

  return (
    <AnimatedScreen style={styles.container}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContainer}>
            <MenuSections title="Account">
                <MenuSectionOption
                    title="Profile"
                    icon={<IconProfile width={26} height={26} />}
                    onPress={() => navigation.navigate('Profile' as never)}
                    isLast={true}
                />
            </MenuSections>

            <MenuSections title="App">
                <MenuSectionOption
                    title="Haptic feedback"
                    icon={<IconVibration width={22} height={22} />}
                    component={
                        <Switch
                            value={settings.hapticsEnabled}
                            onValueChange={(value) => updateSettings('hapticsEnabled', value)}
                        />
                    }
                />
                <MenuSectionOption
                    title="Reduced animations"
                    icon={<IconAnimation width={22} height={22} />}
                    component={
                        <Switch
                            value={settings.animationsReduced}
                            onValueChange={(value) => updateSettings('animationsReduced', value)}
                        />
                    }
                />
                <MenuSectionOption
                    title="Localize estimates"
                    icon={<IconEarthPin width={22} height={22} />}
                    component={
                        <Switch
                            value={settings.localizeEstimates}
                            onValueChange={(value) => updateSettings('localizeEstimates', value)}
                        />
                    }
                    isLast={true}
                />
            </MenuSections>

            <MenuSections title="Help">
                {isDev && <MenuSectionOption
                    title="Clean up app data"
                    icon={<IconDatabase width={22} height={22} />}
                    component={
                        <TouchableOpacity
                            onPress={() => handleCleanUp()}
                        >
                            <Text style={styles.label}>Click here</Text>
                        </TouchableOpacity>
                    }
                />}
                <MenuSectionOption
                    title="Go to onboarding"
                    icon={<IconAlbum width={22} height={22} />}
                    onPress={() => navigation.navigate('Onboarding' as never)}
                />
                <MenuSectionOption
                    title="Send feedback"
                    icon={<IconMailPen width={22} height={22} />}
                    onPress={() => setFeedbackVisible(true)}
                    isLast={true}
                />
            </MenuSections>

            {!isPro && (
                <View style={styles.bottomActions}>
                    <Button onPress={showPaywall} icon={<IconCrown width={20} height={20} />}>Get Premium Access</Button>
                </View>
            )}

            <View style={styles.footer}>   
                <TermsAndPrivacy />
            </View>
        </ScrollView>

        <FeedbackDialog
            visible={feedbackVisible}
            onClose={() => setFeedbackVisible(false)}
        />
    </AnimatedScreen>
  );
};
