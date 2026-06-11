import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          style={styles.profileImage}
        />

        <Text style={styles.title}>Saikiran Nagelli</Text>
        <Text style={styles.subtitle}>
          Frontend Developer | React Native Developer
        </Text>

        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.buttonText}>View Resume</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About Me</Text>

        <Text style={styles.cardText}>
          Passionate developer building modern websites and mobile apps using
          React and React Native.
        </Text>
      </View>

      {/* Skills */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills</Text>

        <Text style={styles.skill}>• React.js</Text>
        <Text style={styles.skill}>• React Native</Text>
        <Text style={styles.skill}>• JavaScript</Text>
        <Text style={styles.skill}>• Git & GitHub</Text>
        <Text style={styles.skill}>• Firebase</Text>
      </View>

      {/* Projects */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Projects</Text>

        <View style={styles.projectBox}>
          <Text style={styles.projectTitle}>Task Manager App</Text>

          <Text style={styles.projectText}>
            Mobile task management application with add and delete features.
          </Text>

          <TouchableOpacity style={styles.projectButton}>
            <Text style={styles.buttonText}>Open Project</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.projectBox}>
          <Text style={styles.projectTitle}>Portfolio Website</Text>

          <Text style={styles.projectText}>
            Personal portfolio website deployed using Vercel.
          </Text>

          <TouchableOpacity style={styles.projectButton}>
            <Text style={styles.buttonText}>Visit Website</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact</Text>

        <Text style={styles.cardText}>📧 saikiran@example.com</Text>
        <Text style={styles.cardText}>📱 +91 XXXXX XXXXX</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },

  mainButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 20,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  cardTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  cardText: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
  },

  skill: {
    color: "#e2e8f0",
    fontSize: 16,
    marginBottom: 10,
  },

  projectBox: {
    backgroundColor: "#0f172a",
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
  },

  projectTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  projectText: {
    color: "#cbd5e1",
    marginTop: 10,
    marginBottom: 15,
    fontSize: 15,
  },

  projectButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});