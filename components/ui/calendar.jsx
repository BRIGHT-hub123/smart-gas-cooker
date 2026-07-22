import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const matrix = [];
  let day = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      if (day < 1 || day > totalDays) { row.push(null); } else { row.push(day); }
      day++;
    }
    matrix.push(row);
  }
  return matrix;
};

const Calendar = ({ onSelectDate }) => {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(null);
  const year = date.getFullYear();
  const month = date.getMonth();
  const matrix = useMemo(() => getMonthMatrix(year, month), [year, month]);
  const changeMonth = (dir) => { const newDate = new Date(year, month + dir, 1); setDate(newDate); };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => changeMonth(-1)}><Text style={styles.arrow}>{"<"}</Text></Pressable>
        <Text style={styles.monthText}>{date.toLocaleString("default", { month: "long" })} {year}</Text>
        <Pressable onPress={() => changeMonth(1)}><Text style={styles.arrow}>{">"}</Text></Pressable>
      </View>
      <View style={styles.weekRow}>
        {daysInWeek.map((d) => (<Text key={d} style={styles.weekDay}>{d}</Text>))}
      </View>
      {matrix.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((day, j) => (
            <Pressable key={j} style={[styles.day, day === selected && styles.selectedDay]} onPress={() => { setSelected(day); onSelectDate?.(new Date(year, month, day)); }}>
              <Text style={[styles.dayText, day === selected && styles.selectedDayText]}>{day}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#020617", borderRadius: 12 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  arrow: { color: "#fff", fontSize: 18 },
  monthText: { color: "#fff", fontWeight: "600" },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  weekDay: { color: "#94a3b8", fontSize: 12, width: 40, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  day: { width: 40, height: 40, alignItems: "center", justifyContent: "center", borderRadius: 20 },
  dayText: { color: "#fff", fontSize: 14 },
  selectedDay: { backgroundColor: "#06b6d4" },
  selectedDayText: { color: "#fff", fontWeight: "600" },
});

export default Calendar;
        <View key={i} className="flex-row justify-between mb-2">

          {row.map((day, j) => {
            const isSelected =
              selected === `${year}-${month}-${day}`;

            return (
              <Pressable
                key={j}
                onPress={() => {
                  if (!day) return;
                  const value = `${year}-${month}-${day}`;
                  setSelected(value);
                  onSelectDate?.(value);
                }}
                className={`
                  w-10 h-10 items-center justify-center rounded-lg
                  ${day ? "bg-slate-800" : "bg-transparent"}
                  ${isSelected ? "bg-cyan-500" : ""}
                `}
              >
                {day && (
                  <Text className="text-white text-sm">
                    {day}
                  </Text>
                )}
              </Pressable>
            );
          })}

        </View>
      ))}
    </View>
  );
};

export default Calendar;