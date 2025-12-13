import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Text, View, TouchableOpacity } from "react-native";
import { PhotoPicker } from "../PhotoPicker/PhotoPicker";
import { TextContentPicker } from "../TextContentPicker/TextContentPicker";
import Button from "../ui/Button";
import Tabs from "../ui/Tabs/Tabs";
import styles from "./ContentUpload.style";
import { useState, useEffect } from "react";
import { recognitionService } from "../../services/recognitionService";
import { SEARCH_HISTORY_KEY, searchHistoryService } from "../../services/searchHistoryService";
import { RecognitionResult } from "../../types/recognition";
import { LimitResponseDto } from "../../types/api";
import { v4 as uuidv4 } from 'uuid';
import SpinnerText from '../ui/SpinnerText/SpinnerText';
import LimitDisplay from '../LimitDisplay/LimitDisplay';
import { usePaywall } from '../../context/PaywallContext';
import { useSettings } from '../../context/SettingsContext';
import { SearchHistoryItem } from '../../types/search';
import { useFeedback } from '../../context/FeedbackContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import IconQuestionDark from '../../assets/icons/icon-question_dark.svg';
import IconDatabase from '../../assets/icons/icon-database.svg';
import { TextInput } from 'react-native-gesture-handler';
import { Accordion } from '../ui/Accordion/Accordion';
import { getErrorMessage } from '../../utils/error';
import { imageToBase64 } from '../../utils/media';
import RecognitionResultView from '../RecognitionResultView/RecognitionResultView';

export default function ContentUpload() {
    const navigation = useNavigation();
    const { isPro, showPaywall } = usePaywall();
    const { settings } = useSettings();
    const { showFeedback } = useFeedback();
    
    const [loading, setLoading] = useState(false);
    const [limitLoading, setLimitLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'image' | 'text'>('image');
    const [uri, setUri] = useState<string | null>(null);
    const [textContent, setTextContent] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [result, setResult] = useState<RecognitionResult | null>(null);
    const [limit, setLimit] = useState<LimitResponseDto | null>(null);

    useEffect(() => {
        const fetchLimit = async () => {
            try {
                setLimitLoading(true);
                const limitData = await recognitionService.getLimit(isPro);
                setLimit(limitData);
            } catch (error) {
                console.error('Error fetching limit:', error);
            } finally {
                setLimitLoading(false);
            }
        };
        fetchLimit();
    }, []);

    const handleImageChange = (newUri: string | null) => {
        setUri(newUri);
        setResult(null);
    };

    const handleTextChange = (text: string) => {
        setTextContent(text);
        setResult(null);
    };

    const handleTabChange = (tabKey: string) => {
        setActiveTab(tabKey as 'image' | 'text');
        setResult(null);
    };

    const handleReset = () => {
        setUri(null);
        setTextContent('');
        setDescription('');
        setResult(null);
    };
    
    const handleUpload = async () => {
        // Validate content based on active tab
        if (activeTab === 'image') {
            if (!uri) {
                Alert.alert('No image selected');
                return;
            }
        } else if (activeTab === 'text') {
            if (!textContent.trim()) {
                Alert.alert('No text entered', 'Please enter some text to check.');
                return;
            }
        }

        if (!isPro && typeof limit?.remaining === 'number' && limit?.remaining <= 0) {
            Alert.alert('No uses left', 'You have reached your limit for the week. Please upgrade to a premium account to renew your limit.');
            showPaywall();
            return;
        }

        // Prepare media based on active tab
        let media;
        if (activeTab === 'image' && uri) {
            media = [{
                type: 'image',
                image_base64: await imageToBase64(uri),
            }];
        } else if (activeTab === 'text') {
            media = [{
                type: 'text',
                text: textContent,
            }];
        }

        if (!media) {
            Alert.alert('No content to check');
            return;
        }

        try {
            setLoading(true);
            const result = await recognitionService.uploadMedia(media, isPro);
            
            if (!result) {
                Alert.alert('No result. Try again.');
                return;
            }
            setResult(result);

            // Save to search history
            try {
                await searchHistoryService.addSearch({
                    id: uuidv4(),
                    imageUri: activeTab === 'image' ? String(uri) : undefined,
                    textContent: activeTab === 'text' ? textContent : undefined,
                    result: result,
                    timestamp: Date.now(),
                });
            } catch (historyError) {
                console.error('Error saving to history:', historyError);
            }

            // Refresh limit after successful upload
            try {
                const limitData = await recognitionService.getLimit(isPro);
                setLimit(limitData);
            } catch (limitError) {
                console.error('Error refreshing limit:', limitError);
            }

            // prompt feedback if history is empty
            try {
                const historyJson = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
                const history = JSON.parse(historyJson || '[]') as SearchHistoryItem[];

                if (history.length <= 1) {
                    setTimeout(() => {
                        showFeedback();
                    }, 3000);
                }
            } catch (error) {
                console.error('Error checking search history:', error);
            }
        } catch (error) {
            console.error('Upload error:', error);
            Alert.alert('Upload failed:', getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }
    
    const isContentReady = (activeTab === 'image' && uri) || (activeTab === 'text' && textContent.trim().length > 0);

    const tabs = [
        {
            key: 'image',
            label: 'Image',
            content: (
                <View style={styles.contentWrapper}>
                    <PhotoPicker imageUri={uri} onImageSelected={handleImageChange} />
                    {!result && (
                        <>
                            <View style={styles.tipContainer}>
                                <Text style={styles.tip}>Tip: Picture the item from top to bottom and in good lighting</Text>
                            </View>
                            <Accordion
                                title="Options"
                                passedStyles={{
                                    header: styles.accordionHeader,
                                    title: styles.accordionTitle,
                                    icon: styles.accordionIcon,
                                    content: styles.accordionContent,
                                }}
                            >
                                <TouchableOpacity disabled={loading} activeOpacity={loading ? 1 : 0.5}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Add additional details..."
                                        value={description}
                                        onChangeText={setDescription}
                                        multiline
                                    />
                                </TouchableOpacity>
                            </Accordion>
                        </>
                    )}
                </View>
            ),
        },
        {
            key: 'text',
            label: 'Text',
            content: (
                <View style={styles.contentWrapper}>
                    <TextContentPicker value={textContent} onTextChange={handleTextChange} disabled={!!result && loading} />
                    {!result && (
                        <View style={styles.tipContainer}>
                            <Text style={styles.tip}>Tip: Paste or type the text you want to check</Text>
                        </View>
                    )}
                </View>
            ),
        },
    ];


    return (
        <View style={styles.container}>
            <LimitDisplay limit={limit} loading={limitLoading} />
            <View style={styles.body}>
                <Tabs tabs={tabs} defaultTab="image" disabled={loading || !!result} onTabChange={handleTabChange} />
                {!result && 
                    <>
                        <View style={styles.actions}>
                            <Button
                                disabled={!isContentReady || loading}
                                onPress={handleUpload}
                            >
                                {loading ?
                                    <SpinnerText
                                        texts={["Checking...", "Hold on...", "Cracking...", "Hmmmm..."]}
                                        style={{ transform: [{ translateY: -9 }] }}
                                        textStyle={{ fontWeight: '600', fontSize: 16, textAlign: 'center' }}
                                        reservedItemWidth={92}
                                        interval={4000}
                                    />
                                    : result ? 'Check again' : 'Check'
                                }
                            </Button>
                        </View>
                        <View style={styles.gridActions}>
                            <TouchableOpacity style={styles.gridAction} onPress={() => navigation.navigate('Tutorial' as never)}>
                                <View style={styles.gridActionIcon}>
                                    <IconQuestionDark width={35} height={35} />
                                </View>
                                <Text style={styles.gridActionText}>How to get better results</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.gridAction} onPress={() => navigation.navigate('FAQ' as never)}>
                                <View style={styles.gridActionIcon}>
                                    <IconDatabase width={32} height={32} />
                                </View>
                                <Text style={styles.gridActionText}>FAQ</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
            {result &&
                <>
                    <RecognitionResultView result={result} />
                    <View style={styles.resultActions}>
                        <Button type="faded" onPress={handleReset} icon={<Ionicons name="arrow-undo-outline" size={20} />}>
                            Try different
                        </Button>
                    </View>
                </>
            }
        </View>
    )
}