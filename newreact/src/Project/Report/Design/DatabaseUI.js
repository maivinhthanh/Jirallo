import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import ImageUpload from '../../../Components/ImageEditor/ImageUpload'
import ImageEditor from '../../../Components/ImageEditor/ImageEditor'

const useStyles = makeStyles({
  A4: {
    // height: 842,
    paddingLeft: 113,
    paddingRight: 75,
    paddingBottom: 75,
    paddingTop: 75
  },
  coverBorder:{
    borderImage: "url('public/images/border.png')"
  },
  coverTitle:{
    fontSize: 20,
    margin: 15,
    fontWeight: 'bold'
  },
  coverSubTitle:{
    fontSize: 18,
    margin: 15,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  coverContent:{
    fontSize: 18,
    
  },

});

export default function DatabaseUI(props) {
  const classes = useStyles();

  const saveImage = (image, name)=>{
    props.saveImage(image, name)
  }
  const updateImage = (image, name, idimage)=>{
    props.updateImage(image, name, idimage)
  }
  const deleteImage = (idimage) =>{
    props.deleteImage(idimage)
  }
  return (
    <div className="Cover">
      <div className={classes.A4} > 
          <div className={classes.coverSubTitle} >
            4.2. CƠ SỞ DỮ LIỆU
          </div>
            {
                _.map(props.info.database.image, (image, ind)=>{
                return(
                    <ImageEditor image={image} key={ind} saveImage={updateImage}
                    deleteImage={deleteImage}/>
                    
                )
                })
            }
            {
                <ImageUpload saveImage={saveImage}/>
            }
                 
          
        </div>
    </div>
  );
}