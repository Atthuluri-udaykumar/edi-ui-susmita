export interface IRepositoryInterface<T> {

    fetchById(entity: T): Promise<T[]>;

    fetchAll(): Promise<T[]>;

    countAll(): Promise<number>;

    update(entity: T): Promise<any>;

    create(entity: T): Promise<any>;

    existsById(entity: T): Promise<boolean>;

	save(entity: T): Promise<any>;

    deleteById(entity: T): Promise<any>;
}