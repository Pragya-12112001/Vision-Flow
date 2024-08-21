import React from 'react';

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DisplayPost = (props) => {
  const {logo, image, prompt, user} = props.post;

  return (
    <div className='postedData'>
      <img 
        className="result-image"
        src={image} 
        alt={prompt} 
      />

      <div className='imgData'>
            <div>
            <img  
            src={logo} 
            alt={prompt} 
            className='userLogo'/>
            {/* <img  src={logo? logo: <AccountCircleIcon/>} alt={prompt} /> */}
            
            <p className='userName'>{user}</p>
            </div>

            <p className='userPrompt'>{prompt}</p>
      </div>

    </div>
  )
}

export default DisplayPost