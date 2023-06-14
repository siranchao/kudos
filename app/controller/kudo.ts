
export const newKudo = async (sender: string, receiver: string[], message: string[], gif: any, accessToken: string) => {
    if (receiver.length === 0) {
      console.log("No Receiver")
    }
    else {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/newKudo`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": accessToken,
          },
          body: JSON.stringify({
            sender: sender,
            receiver: receiver,
            message: message,
            gif: gif,
          })
        });
        const data = await res.json()
        if(data) {
          console.log(data.message)
        }
  
      } catch (error) {
        console.error(error)
      }
    }
}

export const likeKudo = async (id: string, accessToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/likeKudo/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      }
    })
    const data = await res.json()
    console.log(data.message)
    return data.data

  } catch(error) {
    console.error(error)
  }
}

export const dislikeKudo = async (id: string, accessToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/dislikeKudo/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      }
    })
    const data = await res.json()
    console.log(data.message)
    return data.data

  } catch(error) {
    console.error(error)
  }
}

export const collectKudo = async (id: string, accessToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/collectKudo/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      }
    })
    const data = await res.json()
    console.log(data.message)

  } catch(error) {
    console.error(error)
  }
}

export const disCollectKudo = async (id: string, accessToken: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/kudo/disCollectKudo/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken,
      }
    })
    const data = await res.json()
    console.log(data.message)

  } catch(error) {
    console.error(error)
  }
}