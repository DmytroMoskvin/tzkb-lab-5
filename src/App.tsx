import { useCallback, useEffect, useState } from "react";
import { CharacterSets, CheckBox, MaterialIcon } from "./components";
import "./App.css";

const getSecurePassword = (length: number, characters: CharacterSets[]) => Array(length)
  .fill(characters.join(''))
  .map(c => c[Math.floor(Math.random() * c.length)])
  .join('');

const App = () => {
  const [characterSets, setCharacterSets] = useState([
    CharacterSets.CapitalLetters,
    CharacterSets.SmallLetters,
    CharacterSets.Numbers,
    CharacterSets.SpecialCharacters,
  ]);
  const [passwordLength, setPasswordLength] = useState(15);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleCharactersChange = ({ target }: { target: HTMLInputElement }) => {
    const value = target.value;
    const index = characterSets.indexOf(value as CharacterSets);

    if (index > -1) {
      const resultArray = [...characterSets];
      resultArray.splice(index, 1);
      setCharacterSets(resultArray);
    }
    else {
      setCharacterSets([
        ...characterSets,
        value as CharacterSets,
      ]);
    }
  };

  const handlePasswordLengthChange  = ({ target }: { target: HTMLInputElement }) => {
    const value = target.value;
    setPasswordLength(parseFloat(value));
  };

  const generatePassword = useCallback(() => {
    const password = getSecurePassword(passwordLength, characterSets);
    setGeneratedPassword(password);
  }, [passwordLength, characterSets]);

  const handleRegenerate = () => {
    generatePassword();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [characterSets, passwordLength, generatePassword]);

  return (
    <div className="generator__wrapper">
      <div className="generator__settings">
        <div className="generator__row">
          <h1>Settings</h1>
        </div>
        <div className="generator__row generator__row_settings">
          <div className="generator__column">
            <div className="generator__row">
              <h3>Password length:</h3>
            </div>
            <div className="generator__row">
              <input
                className="input_number"
                type="number"
                defaultValue={passwordLength}
                onChange={handlePasswordLengthChange}
                min={5}
                max={30}
              />
            </div>
          </div>
          <div className="generator__column">
            <div className="generator__row">
              <h3>Character sets:</h3>
            </div>
            <div className="generator__row generator__row_character-sets">
              <CheckBox id="capital-letters" label="Capital letters" value={CharacterSets.CapitalLetters} onChange={handleCharactersChange} />
              <CheckBox id="small-letters" label="Small letters" value={CharacterSets.SmallLetters} onChange={handleCharactersChange} />
              <CheckBox id="numbers" label="Numbers" value={CharacterSets.Numbers} onChange={handleCharactersChange} />
              <CheckBox id="special-characters" label="Special characters" value={CharacterSets.SpecialCharacters} onChange={handleCharactersChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="generator__output">
        <div className="generator__row generator__row_result">
          <h2>Generated password:</h2>
          <div className="generated-password__wrapper">
            <p className="generated-password__output">{generatedPassword}</p>
            <button className="generated-password__button" onClick={handleCopy}>
              <MaterialIcon name="content_copy" />
            </button>
          </div>
          <button className="regenerate-button" onClick={handleRegenerate}>
            <h4>Regenerate</h4>
            <MaterialIcon className="regenerate-button__icon" name="refresh" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;