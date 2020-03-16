import axios from 'axios'

const enbase = axios.create({
  baseURL: 'https://enbase.enteam.pl/'
})

export default enbase;