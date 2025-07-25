import React from "react";
import { MOODS } from "../../../const";
import { Mood } from "../../../types";

interface EmojiRadioGroupProps {
    name: string;
    value: Mood;
    onChange: (v: Mood) => void;
}

export const EmojiRadioGroup: React.FC<EmojiRadioGroupProps> = ({
    name,
    value,
    onChange,
}) => (
    <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        {MOODS.map((opt) => (
            <label
                key={opt.value}
                style={{
                    fontSize: 32,
                    cursor: "pointer",
                    filter: value === opt ? "none" : "grayscale(90%)",
                    transition: "filter 0.2s",
                }}
            >
                <input
                    type="radio"
                    name={name}
                    value={opt.value}
                    checked={(value as unknown as string) === opt.value}
                    onChange={() => onChange(opt)}
                    style={{ display: "none" }}
                />
                {opt.emoji}
            </label>
        ))}
    </div>
);
