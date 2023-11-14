interface ProgressCSSProps extends React.CSSProperties {
    '--progress-width': number;
    '--buffered-width': number;
}

interface AudioProgressBarProps
    extends React.ComponentPropsWithoutRef<'input'> {
    duration: number;
    currentProgress: number;
    buffered: number;
}

export function AudioProgressBar(props: AudioProgressBarProps) {
    const { duration, currentProgress, buffered, ...rest } = props;

    const progressBarWidth = isNaN(currentProgress / duration)
        ? 0
        : currentProgress / duration;
    const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;

    const progressStyles: ProgressCSSProps = {
        '--progress-width': progressBarWidth,
        '--buffered-width': bufferedWidth,
    };

    return (
        <div className="box-18">
            <input
                type="range"
                name="progress"
                className={`box-19`}
                style={progressStyles}
                min={0}
                max={duration}
                value={currentProgress}
                {...rest}
            />
        </div>
    );
}
