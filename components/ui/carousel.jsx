import { ArrowLeft, ArrowRight } from "lucide-react-native";
import React, { createContext, useContext, useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";

const CarouselContext = createContext(null);

const { width } = Dimensions.get("window");

/* ROOT */
export const Carousel = ({ data = [], renderItem }) => {
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);

  const scrollTo = (i) => {
    if (i < 0 || i >= data.length) return;
    listRef.current?.scrollToIndex({ index: i, animated: true });
    setIndex(i);
  };

  const canPrev = index > 0;
  const canNext = index < data.length - 1;

  return (
    <CarouselContext.Provider
      value={{ index, scrollTo, canPrev, canNext }}
    >
      <View className="relative">

        <FlatList
          ref={listRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item, index }) => (
            <View style={{ width }}>
              {renderItem({ item, index })}
            </View>
          )}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / width
            );
            setIndex(newIndex);
          }}
        />

        <CarouselPrev />
        <CarouselNext />

      </View>
    </CarouselContext.Provider>
  );
};

/* PREV BUTTON */
export const CarouselPrev = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;

  return (
    <Pressable
      onPress={() => ctx.scrollTo(ctx.index - 1)}
      disabled={!ctx.canPrev}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full opacity-80"
    >
      <ArrowLeft size={18} color="white" />
    </Pressable>
  );
};

/* NEXT BUTTON */
export const CarouselNext = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx) return null;

  return (
    <Pressable
      onPress={() => ctx.scrollTo(ctx.index + 1)}
      disabled={!ctx.canNext}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full opacity-80"
    >
      <ArrowRight size={18} color="white" />
    </Pressable>
  );
};