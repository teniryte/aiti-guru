import { Controller } from 'react-hook-form';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { NumberSlider } from '@/shared/ui/number-slider';
import { useAddProductStore } from '../model/add-product.store';
import { useAddProductForm } from '../model/use-add-product-form';
import { VendorSelectField } from './vendor-select-field';
import styles from './add-product-dialog.module.scss';

const FORM_ID = 'add-product-form';

export function AddProductDialog() {
  const open = useAddProductStore((state) => state.open);
  const setOpen = useAddProductStore((state) => state.setOpen);
  const { form, onSubmit, isPending } = useAddProductForm(open);
  const {
    control,
    register,
    formState: { errors },
  } = form;

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Добавить товар"
      footer={
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Отмена
          </button>
          <Button type="submit" form={FORM_ID} isLoading={isPending}>
            Сохранить
          </Button>
        </div>
      }
    >
      <form id={FORM_ID} className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.fields}>
          <Field label="Название">
            <Input
              {...register('name')}
              placeholder="Введите название"
              isError={Boolean(errors.name)}
              error={errors.name?.message}
              isClearable
            />
          </Field>

          <Field label="Цена">
            <Input
              {...register('price', {
                setValueAs: (value) => (value === '' ? undefined : Number(value)),
              })}
              type="number"
              inputMode="decimal"
              placeholder="Введите цену"
              isError={Boolean(errors.price)}
              error={errors.price?.message}
            />
          </Field>

          <Field label="Рейтинг">
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <NumberSlider
                  value={field.value ?? 0}
                  onChange={field.onChange}
                  min={0}
                  max={5}
                  step={0.1}
                  disabled={isPending}
                  ariaLabel="Рейтинг товара"
                />
              )}
            />
            {errors.rating?.message && <p className={styles.errorText}>{errors.rating.message}</p>}
          </Field>

          <Field label="Вендор">
            <Controller
              name="vendor"
              control={control}
              render={({ field }) => (
                <VendorSelectField
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.vendor?.message}
                  disabled={isPending}
                />
              )}
            />
          </Field>

          <Field label="Артикул">
            <Input
              {...register('article')}
              placeholder="Введите артикул"
              isError={Boolean(errors.article)}
              error={errors.article?.message}
              isClearable
            />
          </Field>
        </div>

        {errors.root?.message && <p className={styles.errorText}>{errors.root.message}</p>}
      </form>
    </Dialog>
  );
}
