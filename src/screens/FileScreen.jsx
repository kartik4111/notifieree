import React, { useEffect, useState } from "react";
import ImageViewer from "react-native-image-zoom-viewer";
import Screen from "../components/Screen";
import colors from "../config/colors";

const FileScreen = ({ route }) => {
  const { type, uri } = route.params;

  return (
    <Screen style={{ flex: 1, padding: 0 }}>
      {type === "image" && (
        <ImageViewer
          imageUrls={[{ url: uri }]}
          renderIndicator={() => null}
          backgroundColor={colors.light.text}
          saveToLocalByLongPress={false}
        />
      )}
    </Screen>
  );
};

export default FileScreen;
