import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet, SafeAreaView, View, TextInput, Pressable, Dimensions, ScrollView } from 'react-native'
const { width, height } = Dimensions.get('window');
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

interface AffirmationProps {
    affirmationText: any;  // The text to be displayed in the affirmation
  }

const Affirmation: React.FC<AffirmationProps> = ({ affirmationText }) =>  {
    return (
      <LinearGradient 
        colors={[Colors.light.yellow, Colors.light.blue]} // Gradient colors
        locations={[0.2785, 0.9698]} // Approximate percentage positions (27.85% and 96.98%)
        style={styles.affirmation1}
        start={{ x: 1, y: 0 }} // Gradient starts from the right
        end={{ x: 0, y: 1 }}   // Gradient ends towards the bottom left
    >
      <ThemedText style={styles.textStyle}>{affirmationText}</ThemedText>
    </LinearGradient>
            
    );
}

const styles = StyleSheet.create({
    affirmation1: {
      width: '70vw',
      aspectRatio: 2,
      flexDirection: 'row',
      backgroundColor: '#000000', // Background color
      // justifyContent: 'center', // Align text vertically
      // alignItems: 'center', // Align text horizontally
      marginBottom: 5,
      borderRadius: 10, // Optional: rounded corners
      marginLeft: 15,
      // marginTop: 150
    },

    textStyle: {
        alignItems: 'center',
        fontSize: 14,
        lineHeight: 15,
        textAlign: 'center'
    }
});

export default Affirmation;
