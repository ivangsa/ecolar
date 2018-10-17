package com.desarrollandojuntos.ecolar.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Field;

import com.desarrollandojuntos.ecolar.domain.enumeration.AccountType;

/**
 * A AccountsDocument.
 */
public class AccountsDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Field
    private Category assets;

    @Field
    private Category liabilities;

    @Field
    private Category reveneu;

    @Field
    private Category expenses;

    private Category getRootCategory(AccountType type) {
        if(AccountType.ASSETS.equals(type)) {
            return assets;
        } else if(AccountType.LIABILITIES.equals(type)) {
            return liabilities;
        } else if(AccountType.REVENUE.equals(type)) {
            return reveneu;
        } else if(AccountType.EXPENSE.equals(type)) {
            return expenses;
        }
        return null;
    }

    public List<Category> getCategoriesAsList() {
        List<Category> list = new ArrayList<>();
        for(AccountType type: AccountType.values()) {
            Category root = getRootCategory(type);
            list.addAll(root.getCategoriesAsList(list));
        }
        return list;
    }

    public AccountsDocument addCategory(Category accountCategory) {
        Category root = getRootCategory(accountCategory.getAccountType());
        Category parent = root.findCategory(accountCategory.getParentId());
        if(parent != null) {
            parent.addCategories(accountCategory);
        } else {
            root.addCategories(accountCategory);
        }
        return this;
    }

    public AccountsDocument removeCategory(Category accountCategory) {
        Category root = getRootCategory(accountCategory.getAccountType());
        Category parent = root.findCategory(accountCategory.getParentId());
        if(parent != null) {
            parent.addCategories(accountCategory);
        }
        accountCategory.setParentId(null);
        accountCategory.setPath(null);
        return this;
    }

    public Category getAssets() {
        return assets;
    }

    public void setAssets(Category assets) {
        this.assets = assets;
    }

    public Category getLiabilities() {
        return liabilities;
    }

    public void setLiabilities(Category liabilities) {
        this.liabilities = liabilities;
    }

    public Category getReveneu() {
        return reveneu;
    }

    public void setReveneu(Category reveneu) {
        this.reveneu = reveneu;
    }

    public Category getExpenses() {
        return expenses;
    }

    public void setExpenses(Category expenses) {
        this.expenses = expenses;
    }

}
