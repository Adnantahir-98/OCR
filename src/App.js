import './App.css';
import { useEffect, useState, useCallback } from 'react'
import {createWorker} from 'tesseract.js'
import {Container, Row, Col} from 'react-bootstrap'


function App() {

  const [selectedImage, setSelectedImage] = useState(null)
  const [textResult, setTextResult] = useState("")
  const [copied, setCopied] = useState('')

  const worker = createWorker()

  const convertImageToText = useCallback(async () => {
    if(!selectedImage) return;

    await worker.load()
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {data} = await worker.recognize(selectedImage)
    setTextResult(data.text)
  }, [worker, selectedImage])

  useEffect(() => {
    convertImageToText()
  }, [selectedImage, convertImageToText])

  const handleChangeImage = e => {
    if(e.target.files[0]){
      setSelectedImage(e.target.files[0])
    }else{
      setSelectedImage(null)
      setTextResult("")
    }
  }
  return (
    <Container className="App">
      <nav>
        <button type="button" class="btn btn-outline-dark ml-auto mt-3" data-toggle="tooltip" data-placement="bottom" title="+92324-4956421">
          Contact
        </button>
      </nav>
      <h1>Optical Character Recognition(OCR)</h1>
      <p>Convert <q><strong><code>Image into Text</code></strong></q> Form</p>
      <div className='input-wrapper form-control'>
        <label htmlFor='upload'>Upload Image</label>
        <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
      </div>

      <Row className='result mt-5'>
        {selectedImage && (
          <Col sm={12} md={6} lg={6} className='box-image'>
            <h4 className='px-2'>Your Image</h4>
            <img src={URL.createObjectURL(selectedImage)} alt="thumbnail" />
          </Col>
        )}
        {textResult && (
          <Col sm={12} md={6} lg={6} className='box-p bg-white'>
            <h4 className='px-2'>Converted Text
              <small className='ml-auto'>
                {copied ? <span className='text-success'>Copied</span>: null}
                <i className='fa fa-copy ml-auto' onClick={() =>  navigator.clipboard.writeText(textResult)}></i>
              </small>
            </h4>
            <p>{textResult}</p>
          </Col>
        )}
      </Row>

      <footer>
        <h5>&copy; copyright 2022 Boys.Inc. All rights reserved.</h5>
      </footer>
    </Container>
  );
}

export default App;
