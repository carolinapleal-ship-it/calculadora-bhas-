import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type Modo = "hipotenusa" | "cateto";

export const calcPitagoras = (modo: Modo, x: number, y: number) => {
  if (!Number.isFinite(x) || !Number.isFinite(y) || x <= 0 || y <= 0) {
    return {
      valor: null,
      erro: "Os valores devem ser números maiores que zero.",
    };
  }

  if (modo === "hipotenusa") {
    return {
      valor: Math.sqrt(x ** 2 + y ** 2),
      erro: "",
    };
  }

  if (y >= x) {
    return {
      valor: null,
      erro: "A hipotenusa deve ser maior que o cateto.",
    };
  }

  return {
    valor: Math.sqrt(x ** 2 - y ** 2),
    erro: "",
  };
};

export default function PitagorasScreen() {
  const [modo, setModo] = useState<Modo>("hipotenusa");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [resultado, setResultado] = useState("");

  const trocarModo = (novoModo: Modo) => {
    setModo(novoModo);
    setA("");
    setB("");
    setResultado("");
  };

  const calcular = () => {
    if (!a.trim() || !b.trim()) {
      setResultado("Preencha os dois valores.");
      return;
    }

    const valorA = Number(a.replace(",", "."));
    const valorB = Number(b.replace(",", "."));
    const dados = calcPitagoras(modo, valorA, valorB);

    if (dados.erro) {
      setResultado(dados.erro);
      return;
    }

    const nome = modo === "hipotenusa" ? "Hipotenusa" : "Cateto";
    setResultado(`${nome} = ${Number(dados.valor?.toFixed(4))}`);
  };

  const labelA = modo === "hipotenusa" ? "Cateto a" : "Hipotenusa c";
  const labelB = modo === "hipotenusa" ? "Cateto b" : "Cateto conhecido";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teorema de Pitágoras</Text>
      <Text style={styles.label}>Escolha o que deseja calcular</Text>
      <View style={styles.modeButtons}>
        <Button
          title="Achar hipotenusa"
          onPress={() => trocarModo("hipotenusa")}
        />
        <Button title="Achar cateto" onPress={() => trocarModo("cateto")} />
      </View>

      <Text style={styles.label}>{labelA}</Text>
      <TextInput
        style={styles.input}
        value={a}
        onChangeText={setA}
        keyboardType="decimal-pad"
        placeholder={`Digite o valor de ${modo === "hipotenusa" ? "a" : "c"}`}
      />

      <Text style={styles.label}>{labelB}</Text>
      <TextInput
        style={styles.input}
        value={b}
        onChangeText={setB}
        keyboardType="decimal-pad"
        placeholder={`Digite o valor de ${modo === "hipotenusa" ? "b" : "cateto"}`}
      />

      <Button title="Calcular" onPress={calcular} />

      <Text style={styles.result}>
        {resultado || "Resultado aparecerá aqui."}
      </Text>
    </View>
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
