import { useState } from 'react';
import axios from 'axios';

interface IRes {
  id: string;
  email: string;
  username: string;
  stacks: [];
  oauth: boolean;
}

const getUser = (accessToken: string) => {
  const [res, setRes] = useState<IRes[]>();
};
