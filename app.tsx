import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import * as React from "react";
import styles from "styles/components.css";

export const App = () => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Função para selecionar uma imagem
  const selectImage = async () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } catch (error) {
      console.error("Erro ao selecionar a imagem:", error);
    }
  };

  // Função chamada quando o arquivo é selecionado
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        console.log("Imagem selecionada:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para adicionar uma marca d'água
  const addWatermark = async () => {
    try {
      if (!selectedImage) {
        console.error("Nenhuma imagem selecionada.");
        return;
      }

      const watermark = createWatermark();
      await addNativeElement(watermark);
      console.log("Marca d'água adicionada:", watermark);
    } catch (error) {
      console.error("Erro ao adicionar a marca d'água:", error);
    }
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">
        <Text>Para começar, selecione uma imagem.</Text>
        <Button variant="primary" onClick={selectImage} stretch>
          Selecionar Imagem
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        {selectedImage && (
          <img src={selectedImage} alt="Imagem selecionada" style={{ maxWidth: "100%" }} />
        )}
        <Button variant="primary" onClick={addWatermark} stretch>
          Adicionar Marca d'água
        </Button>
      </Rows>
    </div>
  );
};

// Função simulada de criação de marca d'água
const createWatermark = () => {
  const watermarkText = "Marca d'água personalizada"; // Texto da marca d'água
  const watermarkStyle = {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.5)",
    position: "absolute",
    bottom: 10,
    right: 10,
  };

  return {
    type: "text",
    content: watermarkText,
    style: watermarkStyle,
  };
};
