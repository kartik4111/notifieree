import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import * as WebBrowser from "expo-web-browser";

import AppText from '../components/AppText';
import Icon from '../components/Icon';
import ListItemSeparator from '../components/ListItemSeparator';
import Screen from "../components/Screen";

const NotificationDetailScreen = ({ navigation, route }) => {
  const { title, body, docType, docURL } = route.params;
  const [iconName, setIconName] = useState();

  useEffect(() => {
    if (docType) {
      if ((docType.search("jpeg") !== -1) || (docType.search("jpg") !== -1) || (docType.search("png") !== -1)) 
        setIconName("image");
      else if (docType.search("pdf") !== -1)
        setIconName("pdf-box");
    }
  }, []);

  const handleIcon = () => {
    if (iconName === "image") return navigation.navigate("Image", { uri: docURL });
    else if (iconName === "pdf-box") handlePdf(docURL);
  };

  const handlePdf = (uri) => {
    WebBrowser.openBrowserAsync(uri);
  }

  return (
    <Screen>
      <AppText style={styles.title}>{title}</AppText>
      {iconName && <Icon name={iconName} color={"#ff5864"} size={30} style={styles.icon} onPress={handleIcon} />}
      <ListItemSeparator />
      <ScrollView>
        <AppText style={styles.body}>{body}</AppText>
      </ScrollView>
    </Screen>    
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 18
  },
  icon: {
    alignItems: "flex-start"
  },
  title: {
    fontSize: 28
  }
});

export default NotificationDetailScreen;