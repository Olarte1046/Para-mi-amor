// Web Audio API Ambient Synthesizer for Pikmin Theme
// Synthesizes soft, organic chimes and nostalgic chiptune-like chimes to avoid CORS or file size overheads.

class AmbientSoundtrack {
    private ctx: AudioContext | null = null;
    private primaryGain: GainNode | null = null;
    private isPlaying = false;
    private intervalId: any = null;
    private currentNote = 0;

    // Peaceful pentatonic melody (C major pentatonic / A minor pentatonic: C4, D4, E4, G4, A4, C5, D5)
    // Inspired by Pikmin title themes and chimes
    private melody = [
        { note: 261.63, duration: 0.8, delay: 0.0 }, // C4
        { note: 329.63, duration: 0.8, delay: 0.8 }, // E4
        { note: 392.00, duration: 0.8, delay: 1.6 }, // G4
        { note: 440.00, duration: 1.2, delay: 2.4 }, // A4
        { note: 392.00, duration: 0.8, delay: 4.0 }, // G4
        { note: 523.25, duration: 0.8, delay: 4.8 }, // C5
        { note: 440.00, duration: 0.8, delay: 5.6 }, // A4
        { note: 392.00, duration: 1.6, delay: 6.4 }, // G4 (long)

        { note: 329.63, duration: 0.8, delay: 8.8 }, // E4
        { note: 293.66, duration: 0.8, delay: 9.6 }, // D4
        { note: 261.63, duration: 1.6, delay: 10.4 }, // C4
        { note: 392.00, duration: 0.8, delay: 12.0 }, // G4
        { note: 329.63, duration: 1.6, delay: 12.8 }  // E4 (long)
    ];
    private loopTime = 16.0; // Seconds per loop

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
                this.primaryGain = this.ctx.createGain();
                this.primaryGain.gain.setValueAtTime(0.18, this.ctx.currentTime); // Low background volume
                this.primaryGain.connect(this.ctx.destination);
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playChime() {
        this.init();
        if (!this.ctx || !this.primaryGain) return;

        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25]; // C-E-G-C chime

        notes.forEach((freq, idx) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();

            osc.type = 'triangle'; // Warmer, softer sound than sine
            osc.frequency.setValueAtTime(freq, now + idx * 0.12);

            gain.gain.setValueAtTime(0, now + idx * 0.12);
            gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.12 + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

            osc.connect(gain);
            gain.connect(this.primaryGain!);

            osc.start(now + idx * 0.12);
            osc.stop(now + idx * 0.12 + 1.5);
        });
    }

    startAmbiance() {
        this.init();
        if (!this.ctx || this.isPlaying) return;

        this.isPlaying = true;

        const playLoop = () => {
            if (!this.isPlaying || !this.ctx || !this.primaryGain) return;
            const startTime = this.ctx.currentTime;

            // Schedule all notes in this loop iteration
            this.melody.forEach(noteData => {
                const osc = this.ctx!.createOscillator();
                const gain = this.ctx!.createGain();

                // Alternating triangle and sine for a forest mallet feel
                osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(noteData.note, startTime + noteData.delay);

                // Soft envelope
                gain.gain.setValueAtTime(0, startTime + noteData.delay);
                gain.gain.linearRampToValueAtTime(0.1, startTime + noteData.delay + 0.15); // soft attack
                gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteData.delay + noteData.duration);

                osc.connect(gain);
                gain.connect(this.primaryGain!);

                osc.start(startTime + noteData.delay);
                osc.stop(startTime + noteData.delay + noteData.duration + 0.2);
            });
        };

        // Immediate play
        playLoop();

        // Loop interval
        this.intervalId = setInterval(() => {
            playLoop();
        }, this.loopTime * 1000);
    }

    stop() {
        this.isPlaying = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    toggle(on: boolean) {
        if (on) {
            this.startAmbiance();
            this.playChime();
        } else {
            this.stop();
        }
    }
}

// Export a singleton instance
export const synth = typeof window !== 'undefined' ? new AmbientSoundtrack() : null;
