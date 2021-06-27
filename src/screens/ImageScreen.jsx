import React, { useContext } from "react";
import ImageViewer from "react-native-image-zoom-viewer";

import Screen from "../components/Screen";
import colors from "../config/colors";
import ColorSchemeContext from "../context/colorScheme";

const InageScreen = ({ route }) => {
  const { colorScheme } = useContext(ColorSchemeContext);

  return (
    <Screen style={{ flex: 1, padding: 0 }}>
      <ImageViewer
        imageUrls={[{ url: route.params.uri }]}
        renderIndicator={() => null}
        backgroundColor={colors[colorScheme].background}
        saveToLocalByLongPress={false}
      />
    </Screen>
  );
};

export default InageScreen;