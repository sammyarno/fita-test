import '../Styles/category.scss';

const Category = ({ category, selected, nominees, onCategoryClick, onNomineeClick }) => {
  let nomineeSelected = (nominees.find(x => x.categoryId === category.id) || {}).nomineeId;

  return (
    <div
      key={category.id}
      className="category-container"
    >
      <div 
        className={`category${selected ? ' active' : ''}`} 
        onClick={() => onCategoryClick(category.id)}
      >
        <h3>{category.title}</h3>
      </div>

      <div className={`nominee-container${selected ? ' show' : ''}`}>
        {
          category.items.map(nominee => (
            <div 
              key={nominee.id} 
              className={`nominee${nomineeSelected === nominee.id ? ' active' : ''}`}
            >
              <h4 className="nominee-title">{nominee.title}</h4>
              <img className="nominee-image" src={nominee.photoUrL} alt="logo" />
              <button className="btn nominee-btn" onClick={() => onNomineeClick(category.id, nominee.id)}>CHOOSE</button>
            </div>
          ))
        }
      </div>
    </div>
  )
};

export default Category;
