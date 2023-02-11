import * as React from "react";
import { Button } from "./button";
import styles from "./form.module.css";

type IFormProps = {
  onSubmit: (payload: { title: string; description: string; price: string }) => void;
};

export const Form: React.FC<IFormProps> = ({ onSubmit }) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);
  const descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = titleRef.current?.value;
    const price = priceRef.current?.value;
    const description = descriptionRef.current?.value;

    if (!title) {
      alert("Your product needs a title");
      return;
    }

    if (!description || !price) {
      alert("Your product needs some content");
      return;
    }

    onSubmit({ title, description, price });
    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
      <span className={styles.label}>Product title: *</span>

      <input
        ref={titleRef}
        placeholder="Title..."
        defaultValue=""
        className={styles.input}
      />

      <span className={styles.label}>Product details: *</span>

      <input
        ref={priceRef}
        placeholder="Price..."
        defaultValue=""
        className={styles.input}
      />

      <textarea
        ref={descriptionRef}
        placeholder="Start typing product description here..."
        defaultValue=""
        className={styles.textarea}
      />

      <Button>Add a product</Button>
    </form>
  );
};
