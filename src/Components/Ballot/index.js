import { useCallback, useEffect, useState } from 'react';
import Modal from '../Modal';
import Category from '../Category';
import Loader from '../Loader';
import Api from '../../Api';
import '../../Styles/ballot.scss';

const Ballot = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNominees, setSelectedNominees] = useState([]);

  const fetchBallotData = useCallback(async () => {
    const res = await Api.getBallotData();
    setTimeout(
      () => {
        setData(res.items);
        setSelectedNominees(res.items.map(item => ({
          categoryId: item.id,
          nomineeId: '',
        })))
      }
      , 3000
    );
  }, []);

  useEffect(() => {
    fetchBallotData();
  }, [fetchBallotData]);

  const toggleModal = () => setShowModal(prev => !prev);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(prev => cat === prev ? '' : cat);
  };

  const handleSelectedNominee = (catId, nomId) => {
    setSelectedNominees(prev => prev.map(item => {
      if (item.categoryId === catId) {
        item.nomineeId = nomId;
      }

      return item;
    }))
  }

  const handleSubmitClick = () => toggleModal();

  const handleCloseModalClick = () => toggleModal();

  return (
    <div className="ballot">
      <h1 className="title">awards 2021</h1>
      <hr />

      {data.length === 0 ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          { data.map((cat) => <Category category={cat} selected={selectedCategory === cat.id} nominees={selectedNominees} onCategoryClick={handleCategoryClick} onNomineeClick={handleSelectedNominee} />) }
          <button type="button" className="btn submit-btn" onClick={handleSubmitClick}>SUBMIT</button>
        </div>
      )}

      { showModal && <Modal data={selectedNominees} onClose={handleCloseModalClick} /> }
    </div>
  );
};

export default Ballot;
