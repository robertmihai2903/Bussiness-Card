import './box.css'

interface VolumeInputProps {
    volume: number;
    onVolumeChange: (volume: number) => void;
}

export function VolumeInput({
                                        volume,
                                        onVolumeChange,
                                    }: VolumeInputProps) {
    return (
        <input
            aria-label="volume"
            name="volume"
            type="range"
            min={0}
            step={0.05}
            max={1}
            value={volume}
            className="box-20"
            onChange={(e) => {
                onVolumeChange(e.currentTarget.valueAsNumber);
            }}
        />
    );
}
