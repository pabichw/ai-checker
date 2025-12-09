import { StyleSheet } from "react-native";
import { colors, spacing } from "../../config/styles";
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;

export default StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.xxl,
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: 26,
      fontWeight: 'bold',
      color: colors.text,
    },
    statLabel: {
      fontSize: 14,
      color: colors.whiteDark,
      marginTop: spacing.xxs,
    },
});
