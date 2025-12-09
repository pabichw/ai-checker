import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { styles } from './ProfileScreen.style';
import { usePaywall } from '../../context/PaywallContext';
import { searchHistoryService } from '../../services/searchHistoryService';
import { recognitionService } from '../../services/recognitionService';
import { LimitResponseDto } from '../../types/api';
import IconCrown from '../../assets/icons/icon-crown.svg';
import Button from '../../components/ui/Button';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { isPro, showPaywall } = usePaywall();
    const [photosTaken, setPhotosTaken] = useState(0);
    const [limit, setLimit] = useState<LimitResponseDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);


    const loadUserData = async () => {
        try {
            setLoading(true);

            // Get photos taken count from search history
            const history = await searchHistoryService.getHistory();
            setPhotosTaken(history.length);

            // Get usage limit
            const limitData = await recognitionService.getLimit(isPro);
            setLimit(limitData);
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getUsagePercentage = () => {
        if (!limit || typeof limit.remaining !== 'number' || typeof limit.total !== 'number') {
            return 0;
        }
        const used = limit.total - limit.remaining;
        return Math.round((used / limit.total) * 100);
    };

    const getUsageStatus = () => {
        if (isPro) {
            return 'Unlimited';
        }
        if (!limit || typeof limit.remaining !== 'number') {
            return 'Loading...';
        }
        return `${limit.remaining} remaining`;
    };

    if (loading) {
        return (
            <AnimatedScreen>
                <View style={styles.centerContainer}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </AnimatedScreen>
        );
    }

    return (
        <AnimatedScreen>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Profile Dashboard</Text>
                <Text style={styles.subtitle}>Your usage and account information</Text>

                {/* Premium Status */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <IconCrown width={28} height={28} fill={isPro ? '#FFD700' : '#ccc'} />
                        <Text style={styles.cardTitle}>Account Status</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={[styles.statusText, isPro && styles.statusTextPremium]}>
                            {isPro ? 'Premium Member' : 'Free Plan'}
                        </Text>
                    </View>
                    {isPro && (
                        <Text style={styles.premiumDescription}>
                            You have unlimited access to all features
                        </Text>
                    )}
                </View>

                {/* Usage Stats */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Usage Statistics</Text>

                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Photos Taken</Text>
                        <Text style={styles.statValue}>{photosTaken}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>This Week's Limit</Text>
                        <Text style={[styles.statValue, isPro && styles.statValuePremium]}>
                            {getUsageStatus()}
                        </Text>
                    </View>

                    {!isPro && limit && typeof limit.remaining === 'number' && typeof limit.total === 'number' && (
                        <>
                            <View style={styles.progressBarContainer}>
                                <View style={styles.progressBarBackground}>
                                    <View
                                        style={[
                                            styles.progressBarFill,
                                            { width: `${getUsagePercentage()}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                    {limit.total - limit.remaining} / {limit.total} used
                                </Text>
                            </View>
                        </>
                    )}
                </View>

                {/* Action Card */}
                {!isPro && (
                    <View style={styles.upgradeCard}>
                        <Text style={styles.upgradeTitle}>Upgrade to Premium</Text>
                        <Text style={styles.upgradeDescription}>
                            Get unlimited ai checkers, priority processing, and access to advanced features.
                        </Text>
                        <Button
                            onPress={showPaywall}
                            icon={<IconCrown width={20} height={20} />}
                        >
                            Upgrade Now
                        </Button>
                    </View>
                )}

                <View style={styles.bottomSpacer} />
            </ScrollView>
        </AnimatedScreen>
    );
}
