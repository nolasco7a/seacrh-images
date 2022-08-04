import {useState} from "react";
import {Formik, Form, Field} from "formik";
import './Header.css'
import './Content.css'
import './Article.css'
const App = () => {
    const[ photos, setPhotos ] = useState([]);
    const open = url => window.open(url, '_blank');
    const searchImages = async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,{
                headers:{
                    'Authorization': 'Client-ID rF0PHAHVuujQlcmaCvINPaKqSpOSjb_c499LOsRNMec'
                }
            })
            const data = await response.json()
            setPhotos(data.results)
    }
  return (
    <div>
      <header>
        <Formik
            initialValues={{search: '',}}
            onSubmit={searchImages}
        >
            <Form>
                <Field type="text" name="search" placeholder="Buscar imagen"/>
            </Form>

        </Formik>
      </header>
        <div className="container">
            <div className="center">
                {photos.map(photo=>(
                    <article key={photo.id} onClick={()=>open(photo.links.html)}>
                        <img src={photo.urls.regular} alt={photo.alt_description}/>
                        <p>{[photo.description, photo.alt_description].join(' - ')}</p>
                    </article>
                ))}
            </div>
        </div>
    </div>
  )
}

export default App
