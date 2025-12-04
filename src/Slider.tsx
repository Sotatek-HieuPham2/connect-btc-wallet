import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";

export default function CustomSlider() {
    const [value, setValue] = useState([43]);

    const dotPositions = [2, 25, 50, 75, 98];

    return (
        <div className="w-full flex items-center gap-2 max-w-md mx-auto p-8 rounded-lg bg-gray-900">
            <div className="relative w-19/12">
                <Slider.Root
                    className="relative flex items-center select-none touch-none w-full h-5"
                    value={value}
                    onValueChange={(e) => {
                        setValue(e);
                    }}
                    max={100}
                    min={0}
                    step={1}>
                    <Slider.Track className="bg-gray-700 relative grow rounded-full h-2">
                        <Slider.Range className="absolute bg-orange-500/30 rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                        className="block w-[14px] h-[14px] bg-orange-500 rounded-full border-2 border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-colors cursor-pointer shadow-lg hover:bg-orange-400 relative z-20"
                        aria-label="Volume"
                    />
                </Slider.Root>

                {/* Position dots */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-10">
                    {dotPositions.map((position) => {
                        const isActive = position <= value[0];
                        const isNearThumb = Math.abs(position - value[0]) < 3;
                        const shouldShow = isActive || !isNearThumb;

                        return (
                            <div
                                key={position}
                                className={`absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                                    isActive ? "bg-orange-500 opacity-100" : shouldShow ? "bg-gray-500 opacity-100" : "opacity-0"
                                }`}
                                style={{ left: `${position}%`, top: "50%" }}
                            />
                        );
                    })}
                </div>
            </div>
            {/* Percentage display */}
            <div className="h-[33px] flex items-center rounded-[8px] py-[5px] pr-[10px] pl-[12px] border border-gray-600 bg-gray-800">
                <span className="text-orange-400 font-mono text-[12px] font-medium">{value[0]} %</span>
            </div>
        </div>
    );
}
