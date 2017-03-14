import { SoundSystem } from './sound-system'
import { ProgressCallback, xhr } from './xhr'

class Sound {
    buffer: AudioBuffer

    constructor(buffer: AudioBuffer) {
        this.buffer = buffer
    }

    static loadFromUrl(url: string, progressCallback: ProgressCallback) {
        return xhr(url, {
            method: 'GET',
            isBinary: true,
            progressCallback
        })
        .then(response => new Promise((resolve, reject) => {
            SoundSystem.getContext().decodeAudioData(
                response,
                (buffer: AudioBuffer) => {
                    resolve(new Sound(buffer))
                },
                (err: any) => {
                    reject(err)
                })
        }))
    }
}

export { Sound }