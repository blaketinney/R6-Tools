"use client"
import { motion } from "framer-motion";

interface Option {
  id: string
  label: string
}

interface ListSelectorProps {
  options: Option[]
  selectedId: string
  onChange: (id: string) => void
}

export default function ListSelector({
  options = [
    { id: "1", label: "Option 1" },
    { id: "2", label: "Option 2" },
    { id: "3", label: "Option 3" },
    { id: "4", label: "Option 4" },
  ],
  selectedId = "1",
  onChange = () => {},
}: ListSelectorProps) {
  return (
    <div className="flex flex-col gap-2 z-10">
      {options.map((option) => (
        <motion.button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`w-40 px-4 py-2 rounded-full text-sm border transition-colors text-center backdrop-blur-sm
            ${
              selectedId === option.id
                ? "border-primary bg-primary/10 text-primary"
                : "border-muted-foreground/20 bg-background/50 hover:border-muted-foreground/40 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
            }
          `}
          whileHover={{ scale: 1.01, x: 2 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  )
}

