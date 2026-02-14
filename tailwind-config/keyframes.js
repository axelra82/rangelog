export const keyframes = {
	"spinner-rotate": {
		"0%": { transform: "rotate(0deg)" },
		"100%": { transform: "rotate(360deg)" },
	},
	"spinner-dash": {
		"0%": {
			strokeDasharray: "1, 200",
			strokeDashoffset: "0",
		},
		"50%": {
			strokeDasharray: "100, 200",
			strokeDashoffset: "-15",
		},
		"100%": {
			strokeDasharray: "100, 200",
			strokeDashoffset: "-125",
		},
	}
};
