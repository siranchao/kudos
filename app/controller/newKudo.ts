
export const newKudo = async (receiver: string[], gif: any, newMessage: string[], sender: string) => {

    if (receiver.length === 0) {
      console.log("No Receiver")
    }
    else {
      const data = {
        sender: sender,
        receiver: receiver,
        kudoGif: gif.id,
        message: newMessage,
      }
  
      try {
        const res = await fetch(`api/kudos`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
  
        const json = await res.json()
        console.log(json);
  
      } catch (error) {
        console.error(error)
      }
    }
  }