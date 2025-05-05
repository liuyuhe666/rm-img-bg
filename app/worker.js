import { pipeline } from '@huggingface/transformers'

class PipelineSingleton {
  static task = 'background-removal'
  static model = 'briaai/RMBG-1.4'
  static instance = null

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { device: 'webgpu', dtype: 'fp32', progress_callback })
    }
    return this.instance
  }
}

globalThis.addEventListener('message', async (event) => {
  const segmenter = await PipelineSingleton.getInstance((x) => {
    globalThis.postMessage(x)
  })

  const output = await segmenter(event.data.text)

  globalThis.postMessage({
    status: 'complete',
    output,
  })
})
