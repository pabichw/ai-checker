import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AnimatedScreen } from '../../components';
import { Accordion } from '../../components/ui/Accordion/Accordion';
import { styles } from './FAQScreen.style';
import Button from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';
import { FAQFilter } from '../../components/FAQFilter/FAQFilter';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
    {
        id: '1',
        question: 'How does the ai checkerer work?',
        answer: 'Simply take a photo of any product, and our AI will identify it and provide you with an estimated price range based on current market data. We search across multiple sources to give you accurate pricing information.',
    },
    {
        id: '2',
        question: 'What types of products can I check?',
        answer: 'You can check almost any consumer product including electronics, clothing, toys, household items, books, and more. For best results, make sure the product is clearly visible and well-lit in your photo.',
    },
    {
        id: '3',
        question: 'How accurate are the price estimates?',
        answer: 'Our AI analyzes current market prices from multiple retailers to provide you with reliable estimates. Prices may vary based on condition, seller, and location. The estimates are meant to give you a general price range to help with your purchasing decisions.',
    },
    {
        id: '4',
        question: 'What is the weekly limit?',
        answer: 'Free users can check a limited number of items per week. This limit resets every week. Upgrade to a premium account for unlimited checks and additional features.',
    },
    {
        id: '5',
        question: 'How can I get better results?',
        answer: '• Frame the entire object from top to bottom\n• Use good lighting - natural light works best\n• Keep the background simple and uncluttered\n• Hold your phone steady when taking the photo\n• Make sure the product is in focus',
    },
    {
        id: '6',
        question: 'What does the premium version include?',
        answer: 'Premium users get unlimited ai checkers, no weekly limits, priority processing, and access to advanced features including price history tracking and price alerts.',
    },
    {
        id: '7',
        question: 'Is my data private and secure?',
        answer: 'Yes! We take your privacy seriously. Photos are processed for AI analysis but not stored at all. The only data we store is your ip address. Search history is stored locally on your device. We never share your personal information with third parties.',
    },
    {
        id: '8',
        question: 'Can I save my search history?',
        answer: 'Yes! All your ai checkers are automatically saved in your search history. You can access them anytime from the History tab to review past searches and compare prices.',
    },
    {
        id: '9',
        question: 'How can I conntact you?',
        answer: 'Please use "Send feedback" form on the Settings screen',
    },
];

export default function FAQScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFAQs = useMemo(() => {
        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            return FAQ_ITEMS.filter(item =>
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query)
            );
        }

        return FAQ_ITEMS;
    }, [searchQuery]);

    return (
        <AnimatedScreen>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Frequently Asked Questions</Text>
                <Text style={styles.subtitle}>Find answers to common questions</Text>

                <FAQFilter
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <View style={styles.accordionContainer}>
                    {filteredFAQs.map((faq) => (
                        <Accordion key={faq.id} title={faq.question}>
                            <Text style={styles.answerText}>{faq.answer}</Text>
                        </Accordion>
                    ))}
                </View>

                <Button type="faded" onPress={() => navigation.goBack()}>
                    Back to Scanner
                </Button>
            </ScrollView>
        </AnimatedScreen>
    );
}
