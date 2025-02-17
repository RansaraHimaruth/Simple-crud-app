import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'
import axios from 'axios';

async function EditTopic({params}) {
  
  const {id} = params;
  console.log('id: ',id);

  const getTopicById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/topics/${id}` , {cache: "no-store"});

      if (response.status !== 200) {
        throw new Error('Failed to fetch topic');
      }

      return response.data;

    } catch (error) {
      console.log('Error fetching topic: ', error);
    }
  }

  const {topic} = await getTopicById(id);
  const {title, description} = topic;
  console.log('title: ',title);
  console.log('description: ',description);


  return (
    <div>
      <EditTopicForm id={id} title={title} description={description}/>
    </div>
  )
}

export default EditTopic
