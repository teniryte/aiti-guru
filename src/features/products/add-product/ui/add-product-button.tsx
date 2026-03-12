import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/assets/icon';
import { useAddProductStore } from '../model/add-product.store';

export function AddProductButton() {
  const openDialog = useAddProductStore((state) => state.openDialog);

  return (
    <Button type="button" icon={<Icon name="add" width={22} height={22} />} onClick={openDialog}>
      Добавить
    </Button>
  );
}
