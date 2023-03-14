import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { addNewTrip, IAddNewTrip } from './store';
import './App.css';

const initFormData = {
  id: '',
  name: '',
  dateStart: '',
  dateEnd: '',
}

function App() {
  const [formData, setFormData] = useState<IAddNewTrip>(initFormData);
  const { trips } = useAppSelector((state) => state.trip);
  const dispatch = useAppDispatch();

  const onChangeUseState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.id = String(new Date().getTime());
    dispatch(addNewTrip(formData))
    setFormData(initFormData);
  };

  return (
    <div className="app">
      <div>
        {!trips.length ? (
          <div>No trips have been created yet</div>
        ) : (
          <ul>
            {trips.map(({ id, name, dateStart, dateEnd }: IAddNewTrip) => (
              <li key={id}><strong>{name}</strong> from {dateStart} to {dateEnd}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Trip Name:
            <input type="text" value={formData.name} name="name" onChange={onChangeUseState} required />
          </label>
          <label>
            Start Date:
            <input type="date" value={formData.dateStart} name="dateStart" onChange={onChangeUseState} required />
          </label>
          <label>
            End Date:
            <input type="date" value={formData.dateEnd} name="dateEnd" onChange={onChangeUseState} required />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default App;
