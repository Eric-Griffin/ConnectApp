import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { theme } from '../../theme';

const PROMPT_QUESTIONS = [
  'A random fact I love is...',
  'The best concert I\'ve ever been to was...',
  'My go-to order at a brewery is...',
  'I\'m looking for someone to...',
  'The most spontaneous thing I\'ve ever done is...',
  'Two truths and a lie...',
  'My simple pleasures...',
  'A social cause I care about is...',
  'My favorite quality in a person is...',
  'I\'m weirdly good at...',
  'My biggest dream is...',
  'The key to my heart is...',
];

type Prompt = {
  question: string;
  answer: string;
};

const PromptSelectorModal = ({ visible, onClose, onSave, existingPrompt }: any) => {
  const [step, setStep] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (existingPrompt) {
      setSelectedQuestion(existingPrompt.question);
      setAnswer(existingPrompt.answer);
      setStep(2);
    }
  }, [existingPrompt]);

  const handleSelectQuestion = (question: string) => {
    setSelectedQuestion(question);
    setStep(2);
  };

  const handleCustomQuestion = () => {
    if (customQuestion) {
      setSelectedQuestion(customQuestion);
      setStep(2);
    }
  };

  const handleSave = () => {
    onSave({ question: selectedQuestion, answer });
    resetAndClose();
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedQuestion('');
    setCustomQuestion('');
    setAnswer('');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={resetAndClose}>
      <SafeAreaView style={styles.modalContainer}>
        {step === 1 ? (
          <View style={styles.flexOne}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose a Prompt</Text>
              <TouchableOpacity onPress={resetAndClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.customPromptContainer}>
              <TextInput
                style={styles.modalInputShort}
                placeholder="Or write your own..."
                value={customQuestion}
                onChangeText={setCustomQuestion}
              />
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  !customQuestion && styles.disabledButton,
                ]}
                onPress={handleCustomQuestion}
                disabled={!customQuestion}>
                <Text style={styles.primaryButtonText}>Use Custom Prompt</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={PROMPT_QUESTIONS}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.promptListItem}
                  onPress={() => handleSelectQuestion(item)}>
                  <Text style={styles.promptListText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedQuestion}</Text>
            <TextInput
              style={styles.modalInput}
              value={answer}
              onChangeText={setAnswer}
              placeholder="Your answer..."
              multiline
            />
            <TouchableOpacity
              style={[styles.modalButton, !answer && styles.disabledButton]}
              onPress={handleSave}
              disabled={!answer}>
              <Text style={styles.primaryButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStep(1)}>
              <Text style={styles.skipText}>Back to questions</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const PromptSlot = ({
  prompt,
  onAdd,
}: {
  prompt: Prompt | null;
  onAdd: () => void;
}) => (
  <TouchableOpacity style={styles.slot} onPress={onAdd}>
    <View style={styles.promptTextContainer}>
      {prompt ? (
        <>
          <Text style={styles.promptQuestion}>{prompt.question}</Text>
          <Text style={styles.slotText}>{`"${prompt.answer}"`}</Text>
        </>
      ) : (
        <Text style={styles.slotPlaceholder}>Add a prompt</Text>
      )}
    </View>
    <View style={styles.addButton}>
      <Text style={styles.addButtonText}>{prompt ? 'Edit' : 'Add'}</Text>
    </View>
  </TouchableOpacity>
);

const PromptsScreen = ({ navigation }: any) => {
  const route = useRoute();
  const { isEditMode } = route.params || {};
  const { user, updateUser } = useApp();
  const { onboardingData, updateOnboardingData } = useOnboarding();

  const [prompts, setPrompts] = useState<(Prompt | null)[]>([null, null, null]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    if (isEditMode && user) {
      const userPrompts = user.prompts || [];
      const filledPrompts = [...userPrompts, ...Array(3 - userPrompts.length).fill(null)];
      setPrompts(filledPrompts);
    } else if (onboardingData) {
      const onboardingPrompts = onboardingData.prompts || [];
      const filledPrompts = [...onboardingPrompts, ...Array(3 - onboardingPrompts.length).fill(null)];
      setPrompts(filledPrompts);
    }
  }, [isEditMode, user, onboardingData]);

  const handleOpenModal = (index: number) => {
    setCurrentPromptIndex(index);
    setModalVisible(true);
  };

  const handleSavePrompt = (prompt: Prompt) => {
    const newPrompts = [...prompts];
    newPrompts[currentPromptIndex] = prompt;
    setPrompts(newPrompts);
  };

  const handleSave = async () => {
    const filledPrompts = prompts.filter(p => p !== null) as Prompt[];
    if (isEditMode) {
      await updateUser({ prompts: filledPrompts });
      navigation.goBack();
    } else {
      updateOnboardingData({ prompts: filledPrompts });
      navigation.navigate('Photos');
    }
  };

  const isNextDisabled = prompts.every(p => p === null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.backButtonCircle}>
            <Text style={styles.backButton}>‹</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{isEditMode ? 'Edit Your Prompts' : 'What makes you, you?'}</Text>
        <Text style={styles.subtitle}>
          Add at least one prompt to give a sense of who you are.
        </Text>

        <PromptSlot prompt={prompts[0]} onAdd={() => handleOpenModal(0)} />
        <PromptSlot prompt={prompts[1]} onAdd={() => handleOpenModal(1)} />
        <PromptSlot prompt={prompts[2]} onAdd={() => handleOpenModal(2)} />

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            💡 More prompts, more matches. Adding prompts can double your
            chances of matching.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.primaryButton,
            isNextDisabled && styles.disabledButton,
          ]}
          disabled={isNextDisabled}
          onPress={handleSave}>
          <Text style={styles.primaryButtonText}>{isEditMode ? 'Save' : 'Continue'}</Text>
        </TouchableOpacity>
      </View>

      <PromptSelectorModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSavePrompt}
        existingPrompt={prompts[currentPromptIndex]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  flexOne: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'flex-start',
  },
  backButtonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 24,
    color: theme.colors.black,
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
    marginBottom: 30,
    lineHeight: 22,
  },
  slot: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  promptTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  promptQuestion: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: theme.colors.black,
    marginBottom: 4,
  },
  slotText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#3C3C43',
    fontStyle: 'italic',
  },
  slotPlaceholder: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bold,
  },
  infoBox: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  infoBoxText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6C6C70',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
  },
  disabledButton: {
    backgroundColor: theme.colors.primary,
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C2C2E',
  },
  modalInput: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    width: '100%',
    minHeight: 120,
    textAlignVertical: 'top',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalInputShort: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  cancelText: {
    marginTop: 15,
    color: theme.colors.gray,
    fontSize: 16,
    textAlign: 'center',
  },
  customPromptContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  promptListItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  promptListText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
  },
  skipText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray,
  },
});

export default PromptsScreen;
