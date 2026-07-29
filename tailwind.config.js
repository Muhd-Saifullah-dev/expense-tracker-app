/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
   "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ========== App ==========
        app: {
          background: "#FFFFFF",
          surface: "#F8FAFC",
        },

        // ========== Cards ==========
        card: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAFC",
          border: "#E5E7EB",
        },

        // ========== Text ==========
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          white: "#FFFFFF",
        },

        // ========== Brand ==========
        brand: {
          primary: "#4F46E5",
          light: "#6366F1",
          dark: "#3730A3",
        },

        // ========== Buttons ==========
        button: {
          primary: "#4F46E5",
          success: "#22C55E",
          danger: "#EF4444",
          disabled: "#D1D5DB",
        },

        // ========== Finance ==========
        finance: {
          income: "#22C55E",
          expense: "#EF4444",
          budget: "#4F46E5",
        },

        // ========== Status ==========
        status: {
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#0EA5E9",
        },

        // ========== Input ==========
        input: {
          background: "#FFFFFF",
          border: "#E5E7EB",
          placeholder: "#9CA3AF",
          text: "#111827",
        },

        // ========== Icon ==========
        icon: {
          primary: "#4F46E5",
          secondary: "#6B7280",
          success: "#22C55E",
          danger: "#EF4444",
        },

        // ========== Divider ==========
        divider: "#F1F5F9",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        full: "9999px",
      },

      fontFamily: {
        regular: ["Poppins-Regular"],
        medium: ["Poppins-Medium"],
        semibold: ["Poppins-SemiBold"],
        bold: ["Poppins-Bold"],
      },

      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.08)",
        button: "0 4px 12px rgba(79,70,229,0.25)",
      },
    },
  },
  plugins: [],
};
