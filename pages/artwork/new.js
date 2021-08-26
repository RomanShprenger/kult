import { useState, useReducer } from 'react';
import { FormNewArtwork } from 'components/Forms';

function NewArtwork() {
  const [step, setStep] = useState(0);

  const artworkDefault = {
    type: "image",
    content: [],
    preview: [],
    title: '',
    description: '',
    tags: ["visual", "contemporary", "objects", "collectible"],
    sale: true,
    saleType: null,
    price: {
      value: 0,
      currency: "eth"
    },
    unlockStatus: true,
    unlockValue: '',
    royalty: 10
  }

  // Data of user
  const owner = {
    avatar: "/assets/author-1x1-2.png",
    hash: "0x3d816...a35c",
  }

  const action = (formSchema) => {
    // Отправляем запрос на бэк в нуном виде
    console.log(formSchema);
  };

  return <div className="artwork-new">
    <FormNewArtwork
      artwork={artworkDefault}
      action={action}
      step={step}
      setStep={setStep}
      owner={owner}
    />
  </div>
}

export default NewArtwork;
