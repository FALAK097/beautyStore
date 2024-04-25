import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Button } from '@rneui/themed';

const ConfirmationModal = ({ visible, message, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Button
            type="outline"
            onPress={onConfirm}
            title="Yes, Confirm"
            buttonStyle={styles.confirmButton}
            titleStyle={styles.confirmText}
          />
          <Button
            type="outline"
            onPress={onCancel}
            title="Cancel"
            buttonStyle={styles.cancelButton}
            titleStyle={styles.cancelText}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
  },
  confirmButton: {
    marginTop: 10,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
  },
  confirmText: {
    color: 'green',
  },
  cancelButton: {
    marginTop: 10,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 10,
  },
  cancelText: {
    color: 'red',
  },
});

export default ConfirmationModal;
