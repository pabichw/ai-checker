import { View, TouchableOpacity, Text, Linking } from 'react-native';

import { styles } from './TermsAndPrivacy.style';

export default function TermsAndPrivacy() {
  const openLink = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => openLink('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/')}>
        <Text style={styles.link}>Terms</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openLink('https://pabich.cc/ai-checker/privacy-policy')}>
        <Text style={styles.link}>Privacy</Text>
      </TouchableOpacity>
    </View>
  );
}

