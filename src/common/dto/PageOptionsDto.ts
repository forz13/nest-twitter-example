import { Type } from 'class-transformer';
import { IsEnum, IsInt, Min, IsOptional, Max, IsString, IsNotEmpty, IsDateString } from 'class-validator';

import { Order } from '../constants/order';

export class PageOptionsDto {
    @IsOptional()
    @IsEnum(Order)
    readonly order: Order = Order.ASC;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(10)
    @Max(50)
    readonly take: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly q?: string;

    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    readonly create_date_start?: string;

    @IsOptional()
    @IsDateString()
    @IsNotEmpty()
    readonly create_date_end?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly tags?: string;
}
