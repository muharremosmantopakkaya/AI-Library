import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

const colors = {
  background: '#ffffff',
  text: '#000000',
  highlight: '#e5e5e5',
  danger: '#e91e63',
  info: '#2196f3',
  warning: '#ffeb3b',
  success: '#4caf50',
  dangerText: '#660000',
  infoText: '#0000cc',
  warningText: '#8e5500',
  successText: '#004c45',
};
const backButtonWidth = 75;
const openWidth = backButtonWidth * 2;
const fontSize = 18;
const padding = 18;

const KNOWLEDGE_BASE = [
  { 
    question: 'LLM nedir?', 
    answer: 'LLM, büyük dil modellerinin bir türüdür ve doğal dil işleme görevlerinde kullanılır. Önceden eğitilmiş büyük dil modelleri, metin tabanlı soru-cevap sistemlerinde, dil çevirisi yapmak için ve daha birçok doğal dil işleme görevinde kullanılabilir.'
  },
  { 
    question: 'NLP nedir?', 
    answer: 'Doğal Dil İşleme (NLP), insan dilinin bilgisayarlar tarafından anlaşılması ve işlenmesi ile ilgilenen bir alanıdır. Metin verileri üzerinde çeşitli işlemler yaparak dil anlayışı, çeviri, duygu analizi, konuşma tanıma ve daha fazlası gibi görevleri içerir.'
  },
  { 
    question: 'Derin öğrenme nedir?', 
    answer: 'Derin öğrenme, yapay sinir ağlarını kullanarak karmaşık desenleri ve görevleri öğrenmek için kullanılan bir makine öğrenme alt alanıdır. Derin öğrenme modelleri, genellikle çok katmanlı ve karmaşık yapıya sahip sinir ağları kullanır ve büyük veri setleri üzerinde eğitilir.'
  },
  { 
    question: 'Veri bilimi nedir?', 
    answer: 'Veri bilimi, veri analizi, veri keşfi, modelleme ve veri tabanlı karar verme gibi süreçleri içeren disiplinler arası bir alanıdır. Veri bilimi, istatistik, makine öğrenimi, yapay zeka, büyük veri teknolojileri ve bilgisayar bilimi gibi alanlardan faydalanır.'
  },
  {
    question: 'Yapay zeka nedir?',
    answer: 'Yapay zeka, bilgisayarların insan zekasını taklit etme yeteneğidir. Öğrenme, problem çözme ve algılama gibi insan zekasına özgü işlevleri gerçekleştirebilen algoritmalar ve yazılımlar geliştirmeyi amaçlar.'
  },
  {
    question: 'Büyük veri nedir?',
    answer: 'Büyük veri, geleneksel veri işleme uygulamalarının işleyemeyeceği kadar büyük veya karmaşık olan veri kümeleridir. Hacim, çeşitlilik ve hız gibi özellikleri ile bilinen büyük veri, yeni içgörüler ve bilgi keşfi için kullanılır.'
  },
  {
    question: 'Blockchain teknolojisi nedir?',
    answer: 'Blockchain, verilerin bloklar halinde zincirleme bir şekilde kaydedildiği dağıtık bir defter teknolojisidir. Her bir blok bir önceki bloğa kriptografik bir bağ ile bağlanır, böylece verilerin değiştirilmesi veya hacklenmesi son derece zorlaşır.'
  },
  {
    question: 'Fine-tuning (ince ayar) nedir?',
    answer: 'Fine-tuning, önceden eğitilmiş bir modelin belirli bir görev veya veri seti için ek eğitimden geçirilmesi sürecidir. Bu, modelin özelleşmiş görevlerde daha iyi performans göstermesini sağlar ve genellikle daha az veri ve hesaplama kaynağı gerektirir.'
  },
  {
    question: 'Transformer modelleri nedir?',
    answer: 'Transformer modelleri, dikkat mekanizmaları kullanarak doğal dil işleme görevlerini gerçekleştiren yapay sinir ağlarıdır. GPT ve BERT gibi modeller bu mimariyi kullanır ve metinler arasındaki bağlamı daha iyi anlamak için eğitilirler.'
  },
  {
    question: 'BERT modeli ne amaçla kullanılır?',
    answer: 'BERT (Bidirectional Encoder Representations from Transformers) modeli, metinlerin daha anlamlı bir şekilde temsil edilmesini sağlamak için kullanılır. Özellikle metnin her iki yönünden (sağdan ve soldan) bağlamı öğrenmek için tasarlanmıştır ve arama motorları, metin sınıflandırma, isimlendirilmiş varlık tanıma gibi birçok NLP görevinde kullanılır.'
  },
  {
    question: 'Dil modelleri nasıl eğitilir?',
    answer: 'Dil modelleri, büyük metin korpuslarından öğrenme yaparak eğitilir. Bu süreç genellikle metinleri önce tokenlere ayırmayı, ardından bu tokenlerin olasılıklarını tahmin etmeyi içerir. Kendi kendine denetimli öğrenme, maskeleme ve metin üretme gibi teknikler kullanılır.'
  },
  {
    question: 'Siber güvenlik nedir?',
    answer: 'Siber güvenlik, bilgisayar sistemleri, ağlar ve verilerin kötü niyetli saldırılara karşı korunması ile ilgili bir alanıdır. Bilgi güvenliğini sağlamak, veri sızıntılarını önlemek ve siber saldırılara karşı savunma sağlamak için teknikler ve süreçler içerir.'
  },

];

const App = () => {
  const [fruits, setFruits] = useState([
    'LLM nedir?', 'NLP nedir?', 'Derin öğrenme nedir?', 'Veri bilimi nedir?', 'Yapay zeka nedir?', 'Büyük veri nedir?', 'Blockchain teknolojisi nedir?',
    'Fine-tuning (ince ayar) nedir?', 'Transformer modelleri nedir?', 'BERT modeli ne amaçla kullanılır?', 'Dil modelleri nasıl eğitilir?', 'Siber güvenlik nedir?',
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (item) => {
    const updatedFruits = fruits.filter(fruit => fruit !== item);
    setFruits(updatedFruits);
  };

  const handleInfo = (item) => {
    const fruit = KNOWLEDGE_BASE.find((knowledge) => knowledge.question === item);
    if (fruit) {
      Alert.alert(`${item}`, fruit.answer);
    } else {
      Alert.alert('Error', 'Açıklama bulunamadı.');
    }
  };

  const handleSuccess = (item) => {
    Alert.alert(`Success ${item}`);
  };

  const handleWarning = (item) => {
    Alert.alert(`Warning ${item}`);
  };

  const filteredFruits = fruits.filter(fruit => fruit.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>AI Library</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image source={require('./sr.png')} style={styles.logo} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
        </View>
      </View>
      <SwipeListView
        data={filteredFruits}
        renderItem={({ item }) => (
          <TouchableHighlight
            style={styles.rowFront}
            underlayColor={colors.highlight}
            onPress={() => console.log(item)}>
            <Text style={styles.frontText}>{item}</Text>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={[styles.backLeftBtn, styles.successBtn]}
              onPress={() => handleSuccess(item)}>
              <Text style={styles.backTextSuccess}>Success</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backLeftBtn, styles.warningBtn]}
              onPress={() => handleWarning(item)}>
              <Text style={styles.backTextWarning}>Warning</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.infoBtn]}
              onPress={() => handleInfo(item)}>
              <Text style={styles.backTextNeutral}>Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.backRightBtn, styles.dangerBtn]}
              onPress={() => handleDelete(item)}>
              <Text style={styles.backTextDanger}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        leftOpenValue={openWidth}
        rightOpenValue={-openWidth}
        stopLeftSwipe={openWidth}
        stopRightSwipe={-openWidth}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: padding,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  searchInput: {
    height: 40,
    flex: 1,
  },
  rowFront: {
    justifyContent: 'center',
    padding: padding,
    backgroundColor: colors.background,
    borderBottomColor: colors.highlight,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  frontText: {
    color: colors.text,
    fontSize: fontSize,
  },
  rowBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    flexDirection: 'row',
    paddingHorizontal: padding,
  },
  backTextNeutral: {
    color: colors.infoText,
    fontSize: fontSize,
  },
  backTextDanger: {
    color: colors.dangerText,
    fontSize: fontSize,
  },
  backTextWarning: {
    color: colors.warningText,
    fontSize: fontSize,
  },
  backTextSuccess: {
    color: colors.successText,
    fontSize: fontSize,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: backButtonWidth,
  },
  infoBtn: {
    backgroundColor: colors.info,
    right: backButtonWidth,
  },
  dangerBtn: {
    backgroundColor: colors.danger,
    right: 0,
  },
  backLeftBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: backButtonWidth,
  },
  successBtn: {
    backgroundColor: colors.success,
    left: backButtonWidth,
  },
  warningBtn: {
    backgroundColor: colors.warning,
    left: 0,
  },
});

export default App;
