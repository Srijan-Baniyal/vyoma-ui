import * as React from "react"
import { motion } from "framer-motion"
import { Checkbox } from "./Checkbox"

export default function CheckboxShowcase() {
  const options = ["Brutal Mode", "Hover Smash", "Animated Tick", "Multi-Select"]
  const [states, setStates] = React.useState(() => options.map(() => false))

  const toggle = (idx: number) => {
    setStates((s) => {
      const nxt = [...s]
      nxt[idx] = !nxt[idx]
      return nxt
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-red-50 border-4 border-black rounded-lg space-y-6"
    >
      <h2 className="text-3xl font-extrabold">Checkbox Showcase</h2>

      <div className="grid grid-cols-2 gap-4">
        {options.map((label, i) => (
          <motion.div
            key={label}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
          >
            <Checkbox
              label={label}
              checked={states[i]}
              onChange={() => toggle(i)}
              className="text-xl"
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => setStates(states.map(() => true))}
        className="mt-4 px-4 py-2 bg-black text-white font-bold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Select All
      </motion.button>
    </motion.div>
  )
}
