import * as React from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";


const TooltipContext = React.createContext({
  visible: false,
});

const TooltipProvider = ({ children }) => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);

  return (
    <TooltipContext.Provider value={{ visible: tooltipVisible, setVisible: setTooltipVisible }}>
      {children}
    </TooltipContext.Provider>
  );
};

const Tooltip = ({ children, visible, onVisibleChange }) => {
  const [isVisible, setIsVisible] = React.useState(visible || false);

  React.useEffect(() => {
    if (visible !== undefined) {
      setIsVisible(visible);
    }
  }, [visible]);

  const showTooltip = () => {
    setIsVisible(true);
    onVisibleChange?.(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
    onVisibleChange?.(false);
  };

  return (
    <TooltipContext.Provider value={{ visible: isVisible, setVisible: setIsVisible }}>
      <View>
        <Pressable onPress={showTooltip} onLongPress={hideTooltip}>
          {children}
        </Pressable>
      </View>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = ({ children, asChild, ...props }) => {
  const { setVisible } = React.useContext(TooltipContext);

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      onPress: () => setVisible(true),
    });
  }

  return (
    <Pressable
      onPress={() => setVisible(true)}
      onLongPress={() => setVisible(false)}
      delayLongPress={500}
      {...props}
    >
      {children}
    </Pressable>
  );
};

const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        styles.content,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        className,
      ]}
      {...props}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Animated.View>
  );
});

TooltipContent.displayName = "TooltipContent";

const styles = StyleSheet.create({
  content: {
    zIndex: 50,
    overflow: "hidden",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#1e293b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    color: "#f8fafc",
  },
});

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

