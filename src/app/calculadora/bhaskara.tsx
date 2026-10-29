import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { useState } from "react";
import { Button, Platform, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export function calcDelta(a, b, c){
  return b ** 2 - 4 * a * c;
}

export function calcBhaskara(a, b, c){
 

  const delta = calcDelta(a,b,c);
  console.log("delta", delta);

  if (delta === 0) {
    const x1 = (b * -1) / (2 * a)
    console.log("x1", x1)
  } else if (delta > 0) {
    const x1 = (b * -1 + delta ** 0.5) / (2 * a);
    const x2 = (b * -1 - delta ** 0.5) / (2 * a);
    console.log("x1", x1);
    console.log("x2", x2);
  } else {
    console.log("Error")
  }
}
export default function BhaskaraScreen() {
  const [valueA, onChangeTextA] = useState("")
 const [valueB, onChangeTextB] = useState("")
 const [valueC, onChangeTextC] = useState("")
 const [resultado, setResultado] = useState("")

  const calc = () => {

    const delta = valueB ** 2 - 4 * valueA * valueC;

    console.log("delta", delta)
if (delta === 0) {
      const x1 = (valueB * -1) / (2 * valueA)
      setResultado(`x1 = ${x1}`)
    } else if (delta > 0) {
      const x1 = (valueB * -1 + delta ** 0.5) / (2 * valueA)
      const x2 = (valueB * -1 - delta ** 0.5) / (2 * valueA)  
      setResultado(`x1 = ${x1} & x2 = ${x2}`)
    } else {
      setResultado("Erro: sem raízes reais existentes")
    }
  };

  return (
    
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          
          <TextInput
            style={styles.input}
            value={valueA}
            onChangeText={onChangeTextA}
            placeholder="A"
          />
          <TextInput
            style={styles.input}
            value={valueB}
            onChangeText={onChangeTextB}
            placeholder="B"
          />
          <TextInput
            style={styles.input}
            value={valueC}
            onChangeText={onChangeTextC}
            placeholder="C"
          />
          <Button title="Calcular" onPress={calc} />
          <TextInput
            value={resultado}
            style={styles.input}
            onChangeText={setResultado}
            placeholder="Resultado"
          />
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  modeButtons: {
    gap: 8,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});