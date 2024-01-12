import React from "react";
import {Autocomplete, Chip, TextField} from "@mui/material";

const ChipInput = ({ value, onChange }) => {
    const handleDelete = (index) => {
        onChange((prevValue) => {
            const newValue = [...prevValue];
            newValue.splice(index, 1);
            return newValue;
        });
    };

    return (
        <Autocomplete
            multiple
            freeSolo
            value={value}
            options={[]}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        key={index}
                        label={option}
                        {...getTagProps({ index })}
                        onDelete={() => handleDelete(index)}
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Add Chip"
                    placeholder="Type and press enter"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim() !== "") {
                            onChange((prevValue) => [...prevValue, e.target.value.trim()]);
                            e.target.value = "";
                        }
                    }}
                />
            )}
        />
    );
};

export default ChipInput;
