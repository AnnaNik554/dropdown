import { useState } from 'react'
import styles from './Dropdown.module.scss'

interface IExternalData {
  prefix: string,
  file: string,
  title: string,
}

interface IData extends IExternalData {
  checked: boolean,
}

type DropdownProps = {
  data: IExternalData[],
  title: string
  multiple?: boolean
}

export const Dropdown: React.FC<DropdownProps> = ({ data, title, multiple = true }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(data.map(i => ({...i, checked: false})))

  const filteredItems = !searchTerm
      ? items
      : items.filter(i =>
          i.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

  const selected = items.filter(i => i.checked)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => setSearchTerm(e.target.value)

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (multiple) {
      setItems(items => items.map(i => i.prefix === e.target.id 
        ? {...i, checked: !i.checked} 
        : i))
    } else {
      setItems(items => items.map(i => {
        if (i.prefix === e.target.id || i.checked) {
          return {...i, checked: !i.checked}
        } else return i
      }))
    }
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    const target = e.target as HTMLButtonElement
    setItems(items => items.map(i => i.prefix === target.value
      ? {...i, checked: !i.checked} 
      : i))
  }

  return (
  <section>
    <div className={styles.container}>
      <p className={styles.text}>{title}</p>
      <form>
        <div className={styles.wrapper}>
          <div 
            className={isOpen 
              ? `${styles.title} ${styles['title_open']}` 
              : `${styles.title} ${styles['title_closed']}`} 
            onClick={() => setIsOpen(!isOpen)}>
            {selected.map(s => <button 
              className={styles.selected} 
              type='button' key={s.prefix} 
              value={s.prefix} 
              onClick={handleClick}>
                {s.title}
              </button>)}
          </div>

          {isOpen && (
            <div className={styles.box}>
            <input className={styles.search} type='text' placeholder='Поиск'  value={searchTerm} onChange={handleChange}/>
            <div className={styles.content}>
              {filteredItems.map(({prefix, file, title, checked}: IData) => (
                <div className={styles.item} key={prefix}>
                  {!!file && <img src={file} alt={title} />}
                  <input 
                    id={prefix} 
                    className={styles.checkbox} 
                    type='checkbox' 
                    checked={checked} 
                    onChange={handleCheckboxChange}/>
                  <label htmlFor={prefix}>{title}</label>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      </form>
    </div>
  </section>
  )
}
