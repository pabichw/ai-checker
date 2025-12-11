import { PricingResult } from "../../types/recognition";
import { formatMoney } from "../../utils/money";
import { View, Text } from "react-native";

import styles from "./ProductDetails.style";

export default function ProductDetails({ product }: { product: PricingResult }) {
    return (
        <View style={styles.container}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <View style={styles.mainSection}>
                <View style={styles.mostLikelyPriceContainer}>
                    <Text style={styles.mostLikelyLabel}>Est. Price</Text>
                    <Text style={styles.mostLikelyPrice}>
                        {formatMoney(product.price?.most_likely, product.price?.currency)}
                    </Text>
                </View>
                <Text style={styles.priceLabel}>Price Range</Text>
                <View style={styles.priceRow}>
                    <View style={styles.priceBox}>
                        <Text style={styles.priceBoxLabel}>Min</Text>
                        <Text style={styles.priceValue}>
                            {formatMoney(product.price?.min, product.price?.currency)}
                        </Text>
                    </View>
                    <View style={styles.priceBox}>
                        <Text style={styles.priceBoxLabel}>Max</Text>
                        <Text style={styles.priceValue}>
                            {formatMoney(product.price?.max, product.price?.currency)}
                        </Text>
                    </View>
                    <View style={styles.priceBox}>
                        <Text style={styles.priceBoxLabel}>Confidence</Text>
                        <Text style={[styles.priceValue, { color: `hsl(${product.confidence * 110}, 100%, 40%)` }]}>
                            {(product.confidence * 100).toFixed(0)}%
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}